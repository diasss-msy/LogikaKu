<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/*
 * Lupa kata sandi: kirim tautan, lalu simpan kata sandi baru dari tautan itu.
 * Jawaban "lupa" selalu sama, ada atau tidak ada akunnya, supaya email siswa
 * tidak bisa ditebak dari luar.
 */
class SandiController extends Controller
{
    public function lupa(Request $request): JsonResponse
    {
        $request->merge(['email' => strtolower(trim((string) $request->input('email', '')))]);
        $data = $request->validate(['email' => ['required', 'string', 'email']], [
            'email.required' => 'Email belum diisi.',
            'email.email' => 'Format email belum benar. Contoh: nama@email.com',
        ]);

        Password::sendResetLink(['email' => $data['email']]);

        return response()->json(['ok' => true]);
    }

    public function baru(Request $request): JsonResponse
    {
        $request->merge(['email' => strtolower(trim((string) $request->input('email', '')))]);
        $data = $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'sandi' => ['required', 'string', 'min:8', 'max:72'],
        ], [
            'token.required' => 'Tautan tidak lengkap. Minta tautan baru.',
            'email.required' => 'Tautan tidak lengkap. Minta tautan baru.',
            'email.email' => 'Tautan tidak lengkap. Minta tautan baru.',
            'sandi.required' => 'Kata sandi baru belum diisi.',
            'sandi.min' => 'Kata sandi minimal 8 karakter.',
            'sandi.max' => 'Kata sandi maksimal 72 karakter.',
        ]);

        $status = Password::reset(
            ['email' => $data['email'], 'password' => $data['sandi'], 'token' => $data['token']],
            function (User $user, string $sandi) {
                $user->forceFill(['password' => $sandi, 'remember_token' => Str::random(60)])->save();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'sandi' => 'Tautan ini sudah tidak berlaku. Minta tautan baru dari halaman Lupa kata sandi.',
            ]);
        }

        return response()->json(['ok' => true]);
    }
}
