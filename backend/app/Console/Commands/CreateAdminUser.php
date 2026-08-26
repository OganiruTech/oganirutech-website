<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:create
                            {--email= : Email address to sign in with}
                            {--name= : Display name}
                            {--password= : Password (prompted securely if omitted)}';

    protected $description = 'Create an administrator account for the dashboard, or reset an existing one';

    public function handle(): int
    {
        $email = $this->option('email') ?: $this->ask('Email address');
        $name  = $this->option('name') ?: $this->ask('Name', 'Administrator');

        $password = $this->option('password') ?: $this->secret('Password (min 12 characters)');

        $validator = Validator::make(
            compact('email', 'name', 'password'),
            [
                'email'    => ['required', 'email', 'max:255'],
                'name'     => ['required', 'string', 'max:255'],
                'password' => ['required', 'string', 'min:12'],
            ],
            [
                'password.min' => 'Use at least 12 characters. This account can read every message the site receives.',
            ]
        );

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $existing = User::where('email', $email)->first();

        if ($existing) {
            if (! $this->confirm("An account already exists for {$email}. Reset its password?", false)) {
                $this->line('Nothing changed.');

                return self::SUCCESS;
            }

            $existing->update([
                'name'     => $name,
                'password' => Hash::make($password),
            ]);

            $this->info("Password reset for {$email}.");

            return self::SUCCESS;
        }

        User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
        ]);

        $this->newLine();
        $this->info("Administrator created: {$email}");
        $this->line('Sign in at '.rtrim(config('app.url'), '/').'/admin/login');

        return self::SUCCESS;
    }
}
