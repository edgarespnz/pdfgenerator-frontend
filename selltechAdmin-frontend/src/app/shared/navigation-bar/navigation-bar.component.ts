import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesNestedTree} from '../../interfaces/RoutesNestedTree.interface';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {

  
  PDF_TREE_DATA: RoutesNestedTree[] = [
  //Nested tree for Products
    {
      title: 'Productos',
      path: '',
      children: [
        { title: 'Todos los productos', path: 'products/all' },
        { title: 'Ver Archivos generados', path: 'generated-files' },
      ],
    },
    {
      title: 'Suscripciones',
      path: '',
      children: [
        { title: 'Todos los usuarios', path: 'subscriptions/users/all' },
        { title: 'Premios', path: 'subscriptions/prizes'},
        { title: 'Beneficios', path: 'subscriptions/benefits'},
        { title: 'Configuración', path: 'subscriptions/settings' },
      ],
    }
  ];
  treeControl = new NestedTreeControl<RoutesNestedTree>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<RoutesNestedTree>();

  constructor
  (
    private router: Router, 
    private route: ActivatedRoute
  ){
    this.dataSource.data = this.PDF_TREE_DATA;
  }

  hasChild = (_: number, node: RoutesNestedTree) => !!node.children && node.children.length > 0

  openRoute(url: string){
    this.router.navigate([`${'admin/' + url}`]);
  }
}
