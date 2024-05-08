import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/apis/user-api/user.service';


@Component({
  selector: 'app-prize-dialog-edit',
  templateUrl: './prize-dialog-edit.component.html',
  styleUrls: ['./prize-dialog-edit.component.css']
})
export class PrizeDialogEditComponent {

  @Output() userUpdated = new EventEmitter<void>();

  editUserFormGroup: FormGroup;
  isLoading = false;

  showErrorMessage = false;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PrizeDialogEditComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.data = this.data.selectedUser;
    this.editUserFormGroup = new FormGroup({
      id: new FormControl(this.data.id),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      username: new FormControl(this.data.username, Validators.required),
      active: new FormControl(this.data.active),
      suscribed: new FormControl(this.data.suscribed),
    });
  }


  onClose(){
    this.dialogRef.close();
  }


  onConfirm(){
    this.updateUser();
  }

  updateUser(){
    this.isLoading = true;
    const userDataWithoutId = {
      email: this.editUserFormGroup.value.email,
      username: this.editUserFormGroup.value.username,
      active: this.editUserFormGroup.value.active,
      suscribed: this.editUserFormGroup.value.suscribed,
    }

    this.userService.putUser(this.editUserFormGroup.value.id, userDataWithoutId).subscribe({
      next: () => {
      },
      error: (error) => {
        this.showErrorMessage = true;
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
        this.userUpdated.emit();
        this.dialogRef.close();
      }
    });
  }
}
