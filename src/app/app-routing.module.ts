import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { MyquestionComponent } from './pages/admin/myquestion/myquestion.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { ViewQuizAnswersComponent } from './pages/user/view-quiz-answers/view-quiz-answers.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileUpdateComponent } from './pages/user/profile-update/profile-update.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch:'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch:'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],

    children:[
      {
        path: '',
        component:WelcomeComponent,
      },
      {
        path: 'all-users',
        component:AllUsersComponent,
      },
      {
        path: 'profile',
        component:ProfileComponent,
      },
      {
        path: 'categories',
        component:ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      // my extra component
      {
        path: 'my-question',
        component: MyquestionComponent,
      },
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'question/:qid',
        component: UpdateQuestionComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,

    canActivate:[NormalGuard],

    children:[
      {
        path: 'profile',
        component:ProfileComponent,
      },
      {
        path: 'profile/update/:uid',
        component:ProfileUpdateComponent,
      },
      {
        path: ':catId',
        component:LoadQuizComponent
      },
      {
        path: 'instructions/:qid',
        component:InstructionsComponent
      },
      
    ]
  },
  {
    path: 'start/:qid',
    component:StartComponent,
    canActivate:[NormalGuard],
  },
  {
    path: 'view-answers/:qid/:title',
    component:ViewQuizAnswersComponent,
    canActivate:[NormalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
