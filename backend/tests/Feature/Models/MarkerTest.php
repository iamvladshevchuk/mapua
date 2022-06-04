<?php

namespace Tests\Feature\Models;

use App\Models\Marker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarkerTest extends TestCase
{
    use RefreshDatabase;

    public function test_marker_can_be_created()
    {
        $marker = Marker::create([
            'name' => 'test',
            'description' => 'test',
            'lat' => 0.1,
            'lng' => 0.1,
        ]);

        $this->assertNotEmpty($marker);
    }

    public function test_marker_can_be_created_without_description()
    {
        $marker = Marker::create([
            'name' => 'test',
            'lat' => 0.1,
            'lng' => 0.1,
        ]);

        $this->assertNotEmpty($marker);
    }

    public function test_marker_factory_works()
    {
        $marker = Marker::factory()->create();

        $this->assertNotEmpty($marker);
    }

    public function test_marker_factory_works_with_session()
    {
        $marker = Marker::factory()->session('test')->create();

        $this->assertEquals('test', $marker->session);
    }
}