import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Currency,
  getEnumKeyValue,
  Status,
  TransactionType,
} from '../../../models/enums';
import { KeyValuePipe } from '@angular/common';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './save-transaction.component.html',
  styleUrl: './save-transaction.component.scss',
})
/**
 * Component to create new transaction
 */
export class SaveTransactionComponent {
  trTypes = getEnumKeyValue(TransactionType);
  statuses = getEnumKeyValue(Status);
  currencies = getEnumKeyValue(Currency);
  infoMessage: string ="";
  infoMsgClass: string ="";
  submitDisabled: boolean = false;
  form = new FormGroup({
    amount: new FormControl<number | null>(0, [Validators.required, Validators.min(0)]),
    currency: new FormControl<Currency | null>(null,[Validators.required]),
    transactionType: new FormControl<TransactionType | null>(null,[Validators.required]),
    status: new FormControl<Status | null>(null,[Validators.required]),
  });
  constructor(private transactionService: TransactionService, private router: Router) {}

  onSubmit() {
    this.infoMessage = "";
    if(this.form.valid) {
      this.submitDisabled = true;
      this.transactionService.saveTransaction({
        amount: this.form.value.amount!,
        currency: this.form.value.currency!,
        status: this.form.value.status! ,
        transactionType: this.form.value.transactionType!
      } as Transaction).subscribe({
        next: (response) => {
          //Show message to user and redirect after few seconds to details page
          this.showMessage("Transaction saved successfully","success");
          setTimeout(()=>{
            this.router.navigate(['/transaction-details',response.id]);
          },3000)
        },
        error: (err) => {
          this.submitDisabled = false;
          let msg = (err.error && typeof err.error === "string") ? err.error : JSON.stringify(err);
          this.showMessage(msg,"error");
        },
      });
    } else{
      this.showMessage("The form is invalid. Please fill all the fields.","error");
    }
  }

  showMessage(msg: string, msgClass: string){
    this.infoMessage = msg;
    this.infoMsgClass = msgClass;
  }
}
