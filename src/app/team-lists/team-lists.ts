import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TeamService } from './services/team-service';
import { Team } from './model/team';
import { SharedModule } from '../shared/shared-module';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Gender {
  name: string;
}

@Component({
  selector: 'app-team-lists',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './team-lists.html',
  styleUrl: './team-lists.scss',
})
export class TeamLists implements OnInit, AfterViewInit, AfterContentInit {
  teamData: Team[] = [];
  showAddForm = false;
  url: string = '';

  number: string | undefined;
  gender: Gender[] | undefined;
  selectedGender: Gender | undefined;

  formTeam!: FormGroup;

  teamDto: Team = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    email: '',
    role: '',
    gender: '',
    avatar: null,
  };

  visible: boolean = false;

  constructor(
    private teamService: TeamService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTeamData();
    this.gender = [{ name: 'Male' }, { name: 'Female' }];
  }

  getTeamData() {
    this.teamService.getTeam().subscribe((data) => {
      this.teamData = data;
      console.log('date', data);
    });
  }
  ngAfterViewInit(): void {
    this.teamForm();
  }

  ngAfterContentInit(): void {}
  teamForm() {
    this.formTeam = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{6,15}$/)],
      ],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      avatar: [null, Validators.required],
    });
  }

  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setTimeout(() => {
          this.url = reader.result as string;
          this.formTeam.patchValue({ avatar: this.url });
          this.cdRef.detectChanges();
        }, 0);
        // this.url = reader.result as string;
        // console.log(this.url);
        // this.formTeam.patchValue({ avatar: this.url });
      };

      reader.readAsDataURL(file);
      // Don't reset value unless needed: input.value = '';
    }
  }

  // onSelectFile(event: Event) {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
  //     this.url = URL.createObjectURL(file);
  //     this.formTeam.patchValue({ avatar: file });
  //     console.log(this.url);
  //     input.value = '';
  //     // reader.onload = () => {
  //     //   this.url = reader.result as string;
  //     //   console.log(this.url);
  //     // };

  //     // reader.readAsDataURL(file);
  //   }
  // }

  removeImage() {
    this.url = '';
    console.log(this.url);
  }

  GotoAdd() {
    this.showAddForm = !this.showAddForm;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  closeModal() {
    this.showAddForm = !this.showAddForm;
    this.visible = false;
  }
  onSubmit() {
    console.log(this.formTeam.value);

    this.teamDto.firstName = this.formTeam.controls['firstName'].value;
    this.teamDto.lastName = this.formTeam.controls['lastName'].value;
    this.teamDto.email = this.formTeam.controls['email'].value;
    this.teamDto.phoneNumber = this.formTeam.controls['phoneNumber'].value;
    this.teamDto.gender = this.formTeam.controls['gender'].value.name;
    this.teamDto.role = this.formTeam.controls['role'].value;
    this.teamDto.avatar = this.formTeam.get('avatar')?.value;

    this.teamService.addNewTeamMember(this.teamDto).subscribe((data) => {
      console.log('', data);
      // this.visible = true;
      setTimeout(() => {
        this.visible = true;
        this.cdRef.detectChanges();
      });
      // this.cdRef.detectChanges();
    });
  }
}
