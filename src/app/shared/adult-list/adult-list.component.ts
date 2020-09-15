import { Component, Input } from '@angular/core';
import { Adult } from '../models/adult.model';
import { faTrashAlt } from '@fortawesome/pro-duotone-svg-icons';
import { ID } from '@datorama/akita';
import { PersonService } from '../state/person.service';

@Component({
  selector: 'app-adult-list',
  templateUrl: './adult-list.component.html',
  styleUrls: ['./adult-list.component.scss']
})
export class AdultListComponent {
  @Input() adults: Adult[];
  faTrashAlt = faTrashAlt;

  constructor(private personService: PersonService) {}

  removeAdult(adultId: ID) {
    this.personService.removeAdult(adultId);
  }
}
