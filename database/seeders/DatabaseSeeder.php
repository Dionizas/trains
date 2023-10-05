<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@ltgkalendorius.lt',
            'email_verified_at' => now(),
            'password' => Hash::make('pavasaris'),
        ]);

        for ($i = 1; $i <= 31; $i++) {
            DB::table('days')->insert([
                'slug' => Str::random(32),
                'name_lt' => 'Diena ' . $i,
                'name_en' => 'Day ' . $i,
                'text_lt' => 'Gruodžio ' . $i . ' diena. Tekstas.',
                'text_en' => 'December ' . $i . ' day. Text.',
                'show_from' => '2022-12-' . $i . ' 00:00:30',
            ]);
        }



    }
}
