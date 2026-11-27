<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Progres;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/*
 * Menyimpan progres per modul. Aturannya sama dengan LK.setLangkah dan LK.catatKuis
 * di public/js/status.js: langkah tidak pernah turun, nilai terbaik yang disimpan,
 * dan nilai 70 ke atas meluluskan modul.
 */
class ProgresController extends Controller
{
    public const JUMLAH_MODUL = 10;

    public const BATAS_LULUS = 0.7;

    private function baris(Request $request, int $modul): Progres
    {
        abort_if($modul < 1 || $modul > self::JUMLAH_MODUL, 404);

        return $request->user()->progres()->firstOrNew(['modul' => $modul], ['langkah' => 0]);
    }

    public function langkah(Request $request, int $modul): JsonResponse
    {
        $data = $request->validate(['langkah' => ['required', 'integer', 'in:1,2']]);
        $p = $this->baris($request, $modul);

        if ($data['langkah'] > $p->langkah) {
            $p->langkah = $data['langkah'];
            $p->save();
        }

        return response()->json(['progres' => $p->only(['modul', 'langkah', 'terakhir', 'terbaik', 'total'])]);
    }

    public function kuis(Request $request, int $modul): JsonResponse
    {
        $data = $request->validate([
            'total' => ['required', 'integer', 'min:1', 'max:50'],
            'benar' => ['required', 'integer', 'min:0', 'lte:total'],
        ]);
        $p = $this->baris($request, $modul);

        $benar = $data['benar'];
        $total = $data['total'];
        $lulusSebelumnya = $p->langkah >= 3;
        $lulus = $benar / $total >= self::BATAS_LULUS;

        if ($p->terbaik === null || $benar / $total > $p->terbaik / ($p->total ?: $total)) {
            $p->terbaik = $benar;
        }
        $p->terakhir = $benar;
        $p->total = $total;
        if ($lulus) {
            $p->langkah = 3;
        } elseif ($p->langkah < 2) {
            $p->langkah = 2;
        }
        $p->save();

        return response()->json([
            'lulus' => $lulus,
            'baruLulus' => $lulus && ! $lulusSebelumnya,
            'progres' => $p->only(['modul', 'langkah', 'terakhir', 'terbaik', 'total']),
        ]);
    }
}
