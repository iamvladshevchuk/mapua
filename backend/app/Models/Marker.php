<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * A model to store information about events on the map
 * 
 * Note: `session` field is a hashed IP of a user. 
 * It's a field designed to hide spam from other users, but it allows 
 * to persist data for this specific user.
 * 
 * This field is essential for my website, because its main role is presentation, 
 * but it shouldn't be used in any production website. 
 * The same goes to any function that uses the session 
 * in the similar fashion on the website.
 */
class Marker extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'lat', 'lng', 'session'
    ];

    public function scopeBySession($query, string $session)
    {
        $query->where('session', $session);
    }

    public function scopeRecent($query)
    {
        $query->where('created_at', '>', now()->subWeeks(1));
    }
}
