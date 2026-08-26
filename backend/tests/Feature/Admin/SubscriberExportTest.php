<?php

namespace Tests\Feature\Admin;

use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriberExportTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_export_returns_a_csv_of_every_subscriber(): void
    {
        Subscriber::factory()->create(['email' => 'one@gmail.com']);
        Subscriber::factory()->create(['email' => 'two@gmail.com']);

        $response = $this->actingAs(User::factory()->create())
            ->get(route('admin.subscribers.export'));

        $response->assertOk();
        $response->assertHeader('content-type', 'text/csv; charset=UTF-8');

        $csv = $response->streamedContent();

        $this->assertStringContainsString('one@gmail.com', $csv);
        $this->assertStringContainsString('two@gmail.com', $csv);
        $this->assertStringContainsString('ID,Email,"Subscribed at (UTC)"', $csv);
    }

    public function test_a_subscriber_can_be_removed(): void
    {
        $subscriber = Subscriber::factory()->create();

        $this->actingAs(User::factory()->create())
            ->from(route('admin.subscribers.index'))
            ->delete(route('admin.subscribers.destroy', $subscriber))
            ->assertRedirect(route('admin.subscribers.index'));

        $this->assertDatabaseCount('subscribers', 0);
    }
}
