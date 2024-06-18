import { MessageService } from './../message.service';
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((x) => {
      console.log(x);
      this.heroes = x;
    });
  }

  // onSelect(hero: Hero): void {
  //   this.messageService.add(
  //     `HeroesComponent: Selected hero id=${hero.id} and name ${hero.name}`
  //   );
  //   console.log(hero);
  //   this.selectedHero = hero;
  // }
}
