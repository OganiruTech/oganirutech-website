<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->timestamp('read_at')->nullable()->after('user_agent');
            $table->timestamp('archived_at')->nullable()->after('read_at');

            $table->index('read_at');
            $table->index('archived_at');
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropIndex(['read_at']);
            $table->dropIndex(['archived_at']);
            $table->dropColumn(['read_at', 'archived_at']);
        });
    }
};
