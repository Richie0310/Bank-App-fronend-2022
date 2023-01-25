import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  allTransactions:any;
  searchKey:string=''


  constructor(private api:ApiService){

  }

  ngOnInit(): void {
    this.api.getAllTransactions()
    .subscribe((result:any)=>{
      console.log(result);
      this.allTransactions = result.transaction
      console.log(this.allTransactions);
      
    })
  }

  // search 
  search(event:any){
    this.searchKey = event.target.value

  }

  // generatepdf (download to pdf)
  generatePdf(){
    var pdf = new jspdf();
    let col = ["type","fromAcno","toAcno","Amount"]
    let row:any = []

    pdf.setFontSize(16);
    pdf.text('Transaction history', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    // convert allTransaction to nested array

    var itemNew =this.allTransactions
    // itemNew.forEach(element=>{
      for (let element of itemNew){
      var temp = [element.type, element.fromAcno, element.toAcno, element.amount]
      row.push(temp)
    }

    (pdf as any).autoTable(col, row, {startY:10})
    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  
  }
}
