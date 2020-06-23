import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowImageComponent } from "./show-image/show-image.component";

const routes: Routes = [
  { path: "", redirectTo: "show-images", pathMatch: "full" },
  { path: "show-images", component: ShowImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
