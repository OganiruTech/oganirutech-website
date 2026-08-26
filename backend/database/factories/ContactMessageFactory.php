<?php

namespace Database\Factories;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactMessage>
 */
class ContactMessageFactory extends Factory
{
    protected $model = ContactMessage::class;

    public function definition(): array
    {
        return [
            'email'      => fake()->safeEmail(),
            'message'    => fake()->paragraph(),
            'ip_address' => fake()->ipv4(),
            'user_agent' => 'Mozilla/5.0 (Test Runner)',
        ];
    }

    public function read(): static
    {
        return $this->state(fn () => ['read_at' => now()]);
    }

    public function archived(): static
    {
        return $this->state(fn () => [
            'read_at'     => now(),
            'archived_at' => now(),
        ]);
    }
}
