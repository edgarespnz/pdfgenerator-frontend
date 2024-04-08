import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { NestedTree } from 'src/app/interfaces/nestedTree.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  //Nested tree for PDF generator
  PDF_TREE_DATA: NestedTree[] = [
    {
      name: 'Generador de PDF',
      url: '',
      children: [
        { name: 'Exportar PDFs', url: 'pdf-generator/export' },
        { name: 'Crear un nuevo grupo de PDFs', url: 'pdf-generator/create'},
      ],
    },
  ];
  treeControl = new NestedTreeControl<NestedTree>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<NestedTree>();

  constructor
  (
    private router: Router, 
    private route: ActivatedRoute
  ){
    this.dataSource.data = this.PDF_TREE_DATA;
  }

  hasChild = (_: number, node: NestedTree) => !!node.children && node.children.length > 0

  openRoute(url: string){
    this.router.navigate([url], { relativeTo: this.route });
  }
}
