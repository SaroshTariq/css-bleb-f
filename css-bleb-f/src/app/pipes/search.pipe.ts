import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(input: any, values: any, propName: string): any {
    
    
    const result = [];
    for(const e of input){
      for(const v of values){
        if(e[propName]!=undefined){
          if(e[propName].toString().toUpperCase().indexOf(v.toString().toUpperCase()) >= 0){
            result.push(e);
          }
        }else{
          result.push(e);
        }
        
      }
    }
    return result;
  }

}
