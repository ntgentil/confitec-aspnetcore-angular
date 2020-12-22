import { Usuario } from '../../shared/usuario';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})

export class UsuariosListComponent implements OnInit {
  UsuarioData: any = [];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'email', 'dataNascimento' , 'action'];

  constructor(private UsuarioApi: ApiService) {
    this.UsuarioApi.GetUsuarios().subscribe(data => {
      this.UsuarioData = data;
      this.dataSource = new MatTableDataSource<Usuario>(this.UsuarioData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteUsuario(index: number, e){
    if(window.confirm('Tem certeza que deseja deletar o Usuário? \n' + e.nome+ ' '+ e.sobrenome)) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.UsuarioApi.DeleteUsuario(e.id).subscribe()
    }
  }

}