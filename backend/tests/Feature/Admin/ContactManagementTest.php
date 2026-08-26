<?php

namespace Tests\Feature\Admin;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactManagementTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_opening_a_message_marks_it_read(): void
    {
        $message = ContactMessage::factory()->create();

        $this->assertFalse($message->isRead());

        $this->actingAs($this->admin)
            ->get(route('admin.contacts.show', $message))
            ->assertOk()
            ->assertSee($message->email);

        $this->assertTrue($message->fresh()->isRead());
    }

    public function test_archiving_removes_a_message_from_the_inbox(): void
    {
        $message = ContactMessage::factory()->create();

        $this->actingAs($this->admin)
            ->patch(route('admin.contacts.archive', $message))
            ->assertRedirect(route('admin.contacts.index'));

        $this->assertTrue($message->fresh()->isArchived());
        $this->assertSame(0, ContactMessage::inbox()->count());
        $this->assertSame(1, ContactMessage::archived()->count());
    }

    public function test_a_message_can_be_restored_and_toggled_unread(): void
    {
        $message = ContactMessage::factory()->archived()->create();

        $this->actingAs($this->admin)
            ->patch(route('admin.contacts.unarchive', $message));

        $this->assertFalse($message->fresh()->isArchived());

        $this->actingAs($this->admin)
            ->patch(route('admin.contacts.read', $message));

        $this->assertFalse($message->fresh()->isRead());
    }

    public function test_the_unread_filter_only_lists_unread_messages(): void
    {
        $unread = ContactMessage::factory()->create(['email' => 'fresh@gmail.com']);
        ContactMessage::factory()->read()->create(['email' => 'handled@gmail.com']);

        $this->actingAs($this->admin)
            ->get(route('admin.contacts.index', ['filter' => 'unread']))
            ->assertOk()
            ->assertSee($unread->email)
            ->assertDontSee('handled@gmail.com');
    }

    public function test_search_matches_the_message_body(): void
    {
        ContactMessage::factory()->create([
            'email'   => 'lead@gmail.com',
            'message' => 'We need a logistics platform built for the region.',
        ]);
        ContactMessage::factory()->create([
            'email'   => 'other@gmail.com',
            'message' => 'Just saying hello.',
        ]);

        $this->actingAs($this->admin)
            ->get(route('admin.contacts.index', ['q' => 'logistics']))
            ->assertOk()
            ->assertSee('lead@gmail.com')
            ->assertDontSee('other@gmail.com');
    }

    public function test_a_message_can_be_deleted(): void
    {
        $message = ContactMessage::factory()->create();

        $this->actingAs($this->admin)
            ->delete(route('admin.contacts.destroy', $message))
            ->assertRedirect(route('admin.contacts.index'));

        $this->assertDatabaseCount('contact_messages', 0);
    }
}
