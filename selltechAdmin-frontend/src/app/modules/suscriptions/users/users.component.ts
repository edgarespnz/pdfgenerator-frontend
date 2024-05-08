import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { after } from 'node:test';
import { User } from 'src/app/interfaces/users/User.interface';
import { UserService } from 'src/app/services/apis/user-api/user.service';
import { PrizeDialogEditComponent } from 'src/app/shared/components/subscriptions/prize-dialog-edit/prize-dialog-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit{

  isLoading = true;
  data: User[] = [];
  resultsLength = 0;

  displayedColumns: string[] = [
    'username',
    'email',
    'active',
    'suscribed',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ){

  }

  ngAfterViewInit(){
    this.isLoading = false;
    this.fetchUsers();
  }

  fetchUsers(){
    this.isLoading = true;
    this.userService.getUsers().subscribe((data: User[]) => {
      this.data = data;
      this.isLoading = false;
    });
  }

  openDialog(user_id: number){
    const selectedUser = this.data.find(user => user.id === user_id);
    const dialogRef = this.dialog.open(PrizeDialogEditComponent, {
      data: {
        selectedUser
      },
    });

    dialogRef.componentInstance.userUpdated.subscribe(() => {
      this.fetchUsers();
    });
  }

}
