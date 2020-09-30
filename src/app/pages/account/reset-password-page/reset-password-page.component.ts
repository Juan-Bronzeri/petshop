import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;
  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.busy = true;
    this
    .service
    .resetPassword(this.form.value)
    .subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Senha Restaurada!');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    )
  }
}
