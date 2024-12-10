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
            'email' => 'admin@proweb.lt',
            'email_verified_at' => now(),
            'password' => Hash::make('pavasaris'),
        ]);

        for ($i = 1; $i <= 31; $i++) {
            DB::table('days')->insert([
                'slug' => Str::random(32),
                'name_lt' => '',
                'name_en' => '',
                'text_lt' => '',
                'text_en' => '',
                'show_from' => '2022-12-' . $i . ' 00:00:30',
            ]);
        }



    }
}
