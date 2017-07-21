import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusFilter',
    pure: false
})
export class StatusFilterPipe implements PipeTransform {
    transform(items: any[], filter: number[], stringFilter: string): any {
        if (items != undefined) {
            var preFilter;
            //filterStatus
            preFilter = items.filter(item => filter.indexOf(item.StatusId) >= 0);
            //filterNames
            if (stringFilter != undefined && stringFilter.length > 0) {
                return preFilter.filter(item => (item.FirstName + " " + item.LastName).indexOf(stringFilter) >= 0);
            }
            else {
                return preFilter;
            }
        }
        else {
            return items;
        }
        
    }
}
