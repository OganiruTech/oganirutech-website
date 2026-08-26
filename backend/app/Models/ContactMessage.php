<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'message',
        'ip_address',
        'user_agent',
    ];

    protected $hidden = [
        'ip_address',
        'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'read_at'     => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    /* -----------------------------------------------------------------
     | State
     | -----------------------------------------------------------------
     */

    public function isRead(): bool
    {
        return $this->read_at !== null;
    }

    public function isArchived(): bool
    {
        return $this->archived_at !== null;
    }

    public function markAsRead(): void
    {
        if ($this->read_at === null) {
            $this->forceFill(['read_at' => now()])->save();
        }
    }

    public function markAsUnread(): void
    {
        $this->forceFill(['read_at' => null])->save();
    }

    public function archive(): void
    {
        $this->forceFill([
            'archived_at' => now(),
            'read_at'     => $this->read_at ?? now(),
        ])->save();
    }

    public function unarchive(): void
    {
        $this->forceFill(['archived_at' => null])->save();
    }

    /* -----------------------------------------------------------------
     | Scopes
     | -----------------------------------------------------------------
     */

    public function scopeUnread(Builder $query): Builder
    {
        return $query->whereNull('read_at');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->whereNotNull('archived_at');
    }

    public function scopeInbox(Builder $query): Builder
    {
        return $query->whereNull('archived_at');
    }

    /**
     * Free-text search across the sender address and message body.
     */
    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        $term = trim((string) $term);

        if ($term === '') {
            return $query;
        }

        $like = '%'.str_replace(['%', '_'], ['\%', '\_'], $term).'%';

        return $query->where(function (Builder $q) use ($like) {
            $q->where('email', 'like', $like)
              ->orWhere('message', 'like', $like);
        });
    }

    /* -----------------------------------------------------------------
     | Presentation
     | -----------------------------------------------------------------
     */

    public function preview(int $length = 120): string
    {
        return Str::limit(preg_replace('/\s+/', ' ', $this->message), $length);
    }
}
