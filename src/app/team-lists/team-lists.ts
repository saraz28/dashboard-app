import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { LoaderService } from '../shared/loader/loader-service';
import Swal from 'sweetalert2';

interface Gender {
  name: string;
}

@Component({
  selector: 'app-team-lists',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './team-lists.html',
  styleUrl: './team-lists.scss',
})
export class TeamLists implements OnInit {
  @Input() searchTerm: string = '';
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
    private cdRef: ChangeDetectorRef,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getTeamData();
    this.gender = [{ name: 'Male' }, { name: 'Female' }];
    this.teamForm();
  }

  getTeamData() {
    this.loadingService.setLoading(true);
    this.teamService.getTeam().subscribe(
      (data) => {
        this.teamData = data;
        this.loadingService.setLoading(false);
      },
      () => {
        Swal.fire({
          text: 'Something went wrong while processing your request. Please try again later.',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      }
    );
  }

  get searchedTeams() {
    return this.teamData.filter((p) =>
      p.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

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

  // handling upload image
  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = () => {
        setTimeout(() => {
          this.url = reader.result as string;
          this.formTeam.patchValue({ avatar: this.url });
          this.cdRef.detectChanges();
          this.loadingService.setLoading(false);
        }, 0);
      };
      reader.onerror = () => {
        this.loadingService.setLoading(false);
        Swal.fire({
          text: 'Failed to read file',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  // remove image after uplaod
  removeImage() {
    this.url = '';
  }

  // navigate to add new team member form
  GotoAdd() {
    this.showAddForm = !this.showAddForm;
  }

  closeModal() {
    this.showAddForm = !this.showAddForm;
    this.visible = false;
  }

  onSubmit() {
    this.teamDto.firstName = this.formTeam.controls['firstName'].value;
    this.teamDto.lastName = this.formTeam.controls['lastName'].value;
    this.teamDto.email = this.formTeam.controls['email'].value;
    this.teamDto.phoneNumber = this.formTeam.controls['phoneNumber'].value;
    this.teamDto.gender = this.formTeam.controls['gender'].value.name;
    this.teamDto.role = this.formTeam.controls['role'].value;
    this.teamDto.avatar = this.formTeam.get('avatar')?.value;
    this.loadingService.setLoading(true);

    this.teamService.addNewTeamMember(this.teamDto).subscribe(
      (data) => {
        this.visible = true;
        this.loadingService.setLoading(false);
        this.getTeamData();
        // reset after submit
        this.formTeam.reset();
        this.url = '';
      },
      () => {
        Swal.fire({
          text: 'Something went wrong while processing your request. Please try again later.',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      }
    );
  }
}
