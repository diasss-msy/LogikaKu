<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/*
 * Akun siswa: daftar, masuk, keluar, data akun, ubah profil, dan ganti kata sandi.
 * Dipanggil dari tampilan lewat fetch dengan sesi cookie Laravel dan token CSRF.
 */
class AkunController extends Controller
{
    private function rapikanEmail(Request $request): void
    {
        $request->merge(['email' => strtolower(trim((string) $request->input('email', '')))]);
    }

    private function jawabanAkun(User $user, int $status = 200): JsonResponse
    {
        return response()->json(['akun' => $user->untukTampilan(), 'csrf' => csrf_token()], $status);
    }

    public function saya(Request $request): JsonResponse
    {
        return response()->json($request->user()->untukTampilan());
    }

    public function daftar(Request $request): JsonResponse
    {
        $this->rapikanEmail($request);
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'sandi' => ['required', 'string', 'min:8', 'max:72'],
        ], [
            'nama.required' => 'Nama panggilan belum diisi.',
            'nama.max' => 'Nama panggilan maksimal 20 karakter.',
            'email.required' => 'Email belum diisi.',
            'email.email' => 'Format email belum benar. Contoh: nama@email.com',
            'email.unique' => 'Email ini sudah terdaftar. Masuk saja, atau pakai email lain.',
            'sandi.required' => 'Kata sandi belum diisi.',
            'sandi.min' => 'Kata sandi minimal 8 karakter.',
            'sandi.max' => 'Kata sandi maksimal 72 karakter.',
        ]);

        $user = User::create([
            'name' => trim($data['nama']),
            'email' => $data['email'],
            'password' => $data['sandi'],
        ]);

        Auth::login($user, remember: true);
        $request->session()->regenerate();

        return $this->jawabanAkun($user, 201);
    }

    public function masuk(Request $request): JsonResponse
    {
        $this->rapikanEmail($request);
        $data = $request->validate([
            'email' => ['required', 'string', 'email'],
            'sandi' => ['required', 'string'],
        ], [
            'email.required' => 'Email belum diisi.',
            'email.email' => 'Format email belum benar. Contoh: nama@email.com',
            'sandi.required' => 'Kata sandi belum diisi.',
        ]);

        if (! Auth::attempt(['email' => $data['email'], 'password' => $data['sandi']], remember: true)) {
            throw ValidationException::withMessages([
                'sandi' => 'Email atau kata sandi belum cocok. Huruf besar dan kecil dibedakan.',
            ]);
        }

        $request->session()->regenerate();

        return $this->jawabanAkun($request->user());
    }

    public function keluar(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['csrf' => csrf_token()]);
    }

    /* Ubah nama dan email. Mengganti email wajib memakai kata sandi saat ini,
     * supaya orang yang meminjam perangkat tidak bisa mengambil alih akun. */
    public function ubahProfil(Request $request): JsonResponse
    {
        $user = $request->user();
        $this->rapikanEmail($request);
        $gantiEmail = $request->input('email') !== $user->email;

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'sandi' => $gantiEmail ? ['required', 'string', 'current_password'] : ['nullable'],
        ], [
            'nama.required' => 'Nama panggilan belum diisi.',
            'nama.max' => 'Nama panggilan maksimal 20 karakter.',
            'email.required' => 'Email belum diisi.',
            'email.email' => 'Format email belum benar. Contoh: nama@email.com',
            'email.unique' => 'Email ini sudah dipakai akun lain.',
            'sandi.required' => 'Masukkan kata sandi untuk mengganti email.',
            'sandi.current_password' => 'Kata sandi belum cocok.',
        ]);

        $user->forceFill(['name' => trim($data['nama']), 'email' => $data['email']])->save();

        return response()->json(['akun' => $user->untukTampilan()]);
    }

    public function gantiSandi(Request $request): JsonResponse
    {
        $data = $request->validate([
            'lama' => ['required', 'string', 'current_password'],
            'baru' => ['required', 'string', 'min:8', 'max:72', 'different:lama'],
        ], [
            'lama.required' => 'Kata sandi lama belum diisi.',
            'lama.current_password' => 'Kata sandi lama belum cocok.',
            'baru.required' => 'Kata sandi baru belum diisi.',
            'baru.min' => 'Kata sandi minimal 8 karakter.',
            'baru.max' => 'Kata sandi maksimal 72 karakter.',
            'baru.different' => 'Kata sandi baru harus berbeda dari yang lama.',
        ]);

        $request->user()->forceFill(['password' => $data['baru']])->save();

        return response()->json(['ok' => true]);
    }
}
