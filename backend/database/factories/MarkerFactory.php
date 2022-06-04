<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Marker>
 */
class MarkerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->city,
            'description' => $this->faker->optional()->text,
            'lat' => $this->faker->randomFloat(null, 0, 180),
            'lng' => $this->faker->randomFloat(null, 0, 180),
            'session' => $this->faker->text(20)
        ];
    }

    public function session(string $session)
    {
        return $this->state(['session' => $session]);
    }
}
