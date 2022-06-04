<?php

namespace Tests\Feature\Markers;

use App\Models\Marker;
use Faker\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarkerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_marker_can_be_stored()
    {
        $this
            ->postJson(route('markers.store'), [
                'name' => 'test',
                'description' => 'test',
                'lat' => 0.1,
                'lng' => 0.1
            ])
            ->assertSuccessful()
            ->assertJsonStructure(['id', 'name', 'lat', 'lng', 'date']);
        
        $this->assertEquals(1, Marker::count());
    }

    public function test_marker_can_be_stored_without_description()
    {
        $this
            ->postJson(route('markers.store'), [
                'name' => 'test',
                'lat' => 0.1,
                'lng' => 0.1
            ])
            ->assertSuccessful()
            ->assertJsonStructure(['id', 'name', 'lat', 'lng', 'date']);
        
        $this->assertEquals(1, Marker::count());
    }

    public function test_marker_cannot_be_stored_with_validation_errors()
    {
        $faker = Factory::create();

        $this->postJson(route('markers.store'), [
            'lat' => 0.1,
            'lng' => 0.1
        ])->assertInvalid([
            'name' => 'The name field is required'
        ]);

        $this->postJson(route('markers.store'), [
            'name' => 'test',
            'lng' => 0.1
        ])->assertInvalid([
            'lat' => 'The lat field is required'
        ]);

        $this->postJson(route('markers.store'), [
            'name' => 'test',
            'lat' => 0.1
        ])->assertInvalid([
            'lng' => 'The lng field is required'
        ]);

        $this->postJson(route('markers.store'), [
            'name' => null,
            'lat' => 0.1,
            'lng' => 0.1
        ])->assertInvalid([
            'name' => 'The name field is required'
        ]);

        $this->postJson(route('markers.store'), [
            'name' => $faker->realTextBetween(51, 100),
            'lat' => 0.1,
            'lng' => 0.1
        ])->assertInvalid([
            'name' => 'The name must not be greater than 50 characters'
        ]);

        $this->postJson(route('markers.store'), [
            'name' => 'test',
            'description' => $faker->realTextBetween(151, 200),
            'lat' => 0.1,
            'lng' => 0.1
        ])->assertInvalid([
            'description' => 'The description must not be greater than 150 characters'
        ]);
        
        $this->assertEquals(0, Marker::count());
    }

    public function test_marker_can_be_seen()
    {
        Marker::factory()->session(hash('sha256', request()->ip()))->create();
        
        $this
            ->getJson(route('markers.index'))
            ->assertJsonCount(1);
    }

    public function test_marker_wont_be_available_in_1_week()
    {
        Marker::factory()->session(hash('sha256', request()->ip()))->create();

        $this->travel(1)->week();
        
        $this
            ->getJson(route('markers.index'))
            ->assertJsonCount(0);
    }
}