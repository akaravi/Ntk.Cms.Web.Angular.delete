import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AccessModel, ErrorExcptionResult} from 'ntk-cms-api';


export class LocalAccessHelper {
    AccessBS = new BehaviorSubject<AccessModel>(new AccessModel());
    AccessBSObs = this.AccessBS.asObservable();

    setAccessValue(access: AccessModel): void {
        this.AccessBS.next(access);
    }

    AccessAddField(nameField: string): any {
       return  this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            if (!model.FieldsInfo) {
                return false;
            }

            model.FieldsInfo.filter((item) => {
                if (nameField.toLowerCase() === item.FieldName.toLowerCase()) {
                    // debugger;
                    return item.AccessAddField;
                }
            });
            return model.AccessDeleteRow;
        });
    }

    AccessEditField(nameField: string): any {
        this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            model.FieldsInfo.filter((item) => {
                if (nameField === item.FieldName && item.AccessEditField === true) {
                    return true;
                } else {
                    return false;
                }
            });
            return model.AccessDeleteRow;
        });
    }

    AccessDeleteRow(): any {
        this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            return model.AccessDeleteRow;
        });
    }

    AccessWatchRow(mo): any {
        this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            return model.AccessWatchRow;
        });
    }

    AccessEditRow(mo): any {
        this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            return model.AccessEditRow;
        });
    }

    AccessAddRow(mo): any {
        this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            return model.AccessAddRow;
        });
    }

    AccessRowInPanelDemo(mo): any {
        this.AccessBSObs.subscribe((model) => {
            if (!model) {
                return false;
            }
            return model.AccessRowInPanelDemo;
        });
    }

    AccessRowWatchInSharingCategory(model: ErrorExcptionResult<any>): boolean {
        if (!model) {
            return false;
        }
        if (!model.Access) {
            return false;
        }
        return model.Access.AccessRowWatchInSharingCategory;
    }

    AccessWatchRowOtherSiteId(model: ErrorExcptionResult<any>): boolean {
        if (!model) {
            return false;
        }
        if (!model.Access) {
            return false;
        }
        return false;
    }

    AccessWatchRowOtherCreatedBy(model: ErrorExcptionResult<any>): boolean {
        if (!model) {
            return false;
        }
        if (!model.Access) {
            return false;
        }
        return model.Access.AccessWatchRowOtherCreatedBy;
    }

    AccessEditRowOtherSiteId(model: ErrorExcptionResult<any>): boolean {
        if (!model) {
            return false;
        }
        if (!model.Access) {
            return false;
        }
        return model.Access.AccessEditRowOtherSiteId;
    }

    AccessEditRowOtherCreatedBy(model: ErrorExcptionResult<any>): boolean {
        if (!model) {
            return false;
        }
        if (!model.Access) {
            return false;
        }
        return model.Access.AccessEditRowOtherCreatedBy;
    }

    AccessDeleteRowOtherCreatedBy(model: ErrorExcptionResult<any>): boolean {
        if (!model) {
            return false;
        }
        if (!model.Access) {
            return false;
        }
        return model.Access.AccessDeleteRowOtherCreatedBy;
    }
}
