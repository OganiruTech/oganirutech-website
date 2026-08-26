<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class DashboardAccessTest extends TestCase
{
    use RefreshDatabase;

    public static function protectedRoutes(): array
    {
        return [
            'overview'    => ['/admin'],
            'contacts'    => ['/admin/contacts'],
            'subscribers' => ['/admin/subscribers'],
            'export'      => ['/admin/subscribers/export'],
        ];
    }

    #[DataProvider('protectedRoutes')]
    public function test_guests_are_redirected_to_the_login_page(string $url): void
    {
        $this->get($url)->assertRedirect('/admin/login');
    }

    public function test_an_authenticated_admin_reaches_the_overview(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/admin')
            ->assertOk()
            ->assertSee('Overview');
    }

    public function test_valid_credentials_sign_the_admin_in(): void
    {
        $user = User::factory()->create([
            'email'    => 'admin@oganiru.tech',
            'password' => 'correct-horse-battery',
        ]);

        $this->post('/admin/login', [
            'email'    => 'admin@oganiru.tech',
            'password' => 'correct-horse-battery',
        ])->assertRedirect('/admin');

        $this->assertAuthenticatedAs($user);
    }

    public function test_wrong_credentials_are_rejected(): void
    {
        User::factory()->create(['email' => 'admin@oganiru.tech']);

        $this->from('/admin/login')
            ->post('/admin/login', [
                'email'    => 'admin@oganiru.tech',
                'password' => 'wrong-password',
            ])
            ->assertRedirect('/admin/login')
            ->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_an_admin_can_sign_out(): void
    {
        $this->actingAs(User::factory()->create())
            ->post('/admin/logout')
            ->assertRedirect('/admin/login');

        $this->assertGuest();
    }
}
