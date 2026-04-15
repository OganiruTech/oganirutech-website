<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
}