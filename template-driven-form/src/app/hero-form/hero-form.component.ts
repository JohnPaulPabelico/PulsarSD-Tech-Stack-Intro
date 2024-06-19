import { Component } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent {
  powers = [
    'One For All',
    'Explosion',
    'Zero Gravity',
    'Engine',
    'Half-Cold Half-Hot',
    'Frog',
    'Hardening',
    'Creation',
    'Electrification',
    'Dark Shadow',
    'Tail',
    'Earphone Jack',
    'Tape',
    'Sugar Rush',
    'Invisibility',
    'Anivoice',
    'Dupli-Arms',
    'Naval Laser',
    'Pop Off',
    'Acid',
  ];

  model = new Hero(18, 'Izuku Midoriya', this.powers[0], 'Deku');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new Hero(42, '', '');
  }
}
