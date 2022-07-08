import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { CtmdashboardComponent } from './master/clienttypemaster/ctmdashboard/ctmdashboard.component';
import { OmdashboardComponent } from './master/operationalmode/omdashboard/omdashboard.component';
import { TsdashboardComponent } from './master/ticketstatus/tsdashboard/tsdashboard.component';
import { PmdashboardComponent } from './master/prioritymode/pmdashboard/pmdashboard.component';
import { MmdashboardComponent } from './master/modulemaster/mmdashboard/mmdashboard.component';
import { AddempdashboardComponent } from './master/addemp/addempdashboard/addempdashboard.component';
import { AddclientdashboardComponent } from './master/addclient/addclientdashboard/addclientdashboard.component';
import { DatePipe } from '@angular/common'
import {MatButtonModule} from '@angular/material/button';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from'@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AddclienttypeComponent } from './master/clienttypemaster/ctmdashboard/addclienttype/addclienttype.component';
import { AddomComponent } from './master/operationalmode/addom/addom.component';
import { AddtsComponent } from './master/ticketstatus/addts/addts.component';
import { AddpmComponent } from './master/prioritymode/addpm/addpm.component';
import { AddmmComponent } from './master/modulemaster/addmm/addmm.component';
import { AddeComponent } from './master/addemp/adde/adde.component';
import { EditctmComponent } from './master/clienttypemaster/editctm/editctm.component';
import { EditomComponent } from './master/operationalmode/editom/editom.component';
import { EdittsComponent } from './master/ticketstatus/editts/editts.component';
import { EditpmComponent } from './master/prioritymode/editpm/editpm.component';
import { EditmmComponent } from './master/modulemaster/editmm/editmm.component';
import { EditempComponent } from './master/addemp/editemp/editemp.component';
import { AdclComponent } from './master/addclient/addclientdashboard/adcl/adcl.component';
import { LoginComponent } from './login_reg_emp_client/login/login.component';
import { ForgetpassComponent } from './login_reg_emp_client/forgetpass/forgetpass.component';
import { SignupComponent } from './login_reg_emp_client/signup/signup.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RightclickoffDirective } from './Directives/RightClick/rightclickoff.directive';
import { ControlkeyoffDirective } from './Directives/Ctrlkey/controlkeyoff.directive';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RaiseticketComponent } from './operations/raiseticket/raiseticket/raiseticket.component';
import { AssignticketComponent } from './operations/assignticket/assignticket/assignticket.component';
import { AttendanddeliverComponent } from './operations/attendanddeliverticket/attendanddeliver/attendanddeliver.component';
import { EditatComponent } from './operations/assignticket/editat/editat/editat.component';
import { EditadanddComponent } from './operations/attendanddeliverticket/attendanddeliver/edita&d/editadandd/editadandd.component';
import { AddrtComponent } from './operations/raiseticket/addrt/addrt/addrt.component';

import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTooltipModule} from '@angular/material/tooltip';

// import { ComponentNameComponent } from './master/addclient/component-name/component-name.component';
// import {MatButtonModule} from '@angular/material/button';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';

import { ComponentNameComponent } from './master/addclient/component-name/component-name.component';


import { UsermaintananceComponent } from './operations/Admin/usermaintanance/usermaintanance.component';
import { NotificationsComponent } from './operations/Admin/notifications/notifications.component';
import { AddnotifyComponent } from './operations/Admin/Addnotification/addnotify/addnotify.component';
import { EditnotifyComponent } from './operations/Admin/Edit/editnotify/editnotify.component';

import {MatRadioModule} from '@angular/material/radio';

import { TemplateComponent } from './mail_template_reg_verification/template/template.component';
import { EdittktComponent } from './operations/raiseticket/edittkt/edittkt.component';
import { SearchByDateComponent } from './search/search-by-date/search-by-date.component';
import { SearchByTicketComponent } from './search/search-by-ticket/search-by-ticket.component';
import { ClientHeaderComponent } from './common/client-header/client-header.component';
import { ViewComponent } from './search/view/view.component';


import {MatDialogModule} from '@angular/material/dialog';
import { DialogmodalComponent } from './login_reg_emp_client/dialogmodal/dialogmodal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

// import { ToastrModule } from 'ngx-toastr';
import {MatGridListModule} from '@angular/material/grid-list';
import { NotificationService } from './service/notification.service';
import { ClientraisetktComponent } from './operations/Client_Raiseticket/clientraisetkt/clientraisetkt.component';
import { AddclientraisetktComponent } from './operations/Client_Raiseticket/addclientraisetkt/addclientraisetkt.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditclientraiseticketComponent } from './operations/Client_Raiseticket/editclientraiseticket/editclientraiseticket.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import { ChartsModule } from 'ng2-charts';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CtmdashboardComponent,
    OmdashboardComponent,
    TsdashboardComponent,
    PmdashboardComponent,
    MmdashboardComponent,
    AddempdashboardComponent,
    AddclientdashboardComponent,
   AddclienttypeComponent,
    AddomComponent,
    AddtsComponent,
    AddpmComponent,
    AddmmComponent,
    AddeComponent,
    EditctmComponent,
    EditomComponent,
    EdittsComponent,
    EditpmComponent,
    EditmmComponent,
    EditempComponent,
    AdclComponent,
    LoginComponent,
    ForgetpassComponent,
    SignupComponent,
    RaiseticketComponent,
    AssignticketComponent,
    AttendanddeliverComponent,
    EditatComponent,
    EditadanddComponent,
    AddrtComponent,
    ComponentNameComponent,
    RightclickoffDirective,
    ControlkeyoffDirective,




    TemplateComponent,


    UsermaintananceComponent,

    NotificationsComponent,
    AddnotifyComponent,
    EditnotifyComponent,
    EdittktComponent,

    DialogmodalComponent,
    ClientraisetktComponent,
    AddclientraisetktComponent,

    SearchByDateComponent,
    SearchByTicketComponent,
    ClientHeaderComponent,
    ViewComponent,
    EditclientraiseticketComponent


  ],
  imports: [
    AngularEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    NgSelectModule,
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatRadioModule,
    AutocompleteLibModule,

    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatBadgeModule,
    ChartsModule,
    MatSlideToggleModule,
    MatTooltipModule,

    ToastrModule.forRoot(),
    // ToastrModule.forRoot({
    //   timeOut: 10000,
    //   positionClass: 'toast-top-center',
    //   preventDuplicates: false,
    // }),

],

  providers: [NotificationService,
    {provide:LocationStrategy, useClass:HashLocationStrategy},DatePipe,CtmdashboardComponent,

  ],


  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}
