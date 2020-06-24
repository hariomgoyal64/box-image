import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { DivCollection } from "./show-image.modal";
import { ToastrService } from "ngx-toastr";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-show-image",
  templateUrl: "./show-image.component.html",
  styleUrls: ["./show-image.component.scss"],
})
export class ShowImageComponent implements OnInit {
  /**
   * local reference for divCollection
   */
  divCollection: DivCollection[] = [
    { name: "One", value: 1, showImage: false, url: null },
    { name: "Two", value: 2, showImage: false, url: null },
    { name: "Three", value: 3, showImage: false, url: null },
    { name: "Four", value: 4, showImage: false, url: null },
    { name: "Five", value: 5, showImage: false, url: null },
    { name: "Six", value: 6, showImage: false, url: null },
  ];

  /**
   * local reference for imgCollection
   */
  imgCollection = [
	"assets/images/one.jpeg",
	"assets/images/two.jpeg",
	"assets/images/three.jpeg",
	"assets/images/four.jpeg",
	"assets/images/five.jpeg",
	"assets/images/six.jpeg",
	];

  /**
   * local reference for deleteImageModal
   */
  @ViewChild("deleteImageModal") assetConfirmModal: TemplateRef<NgbModal>;

  /**
   * local reference for modelRef
   */
  modelRef: NgbModalRef;

  /**
   * local reference for currentIndex
   */
  currentIndex: number;

  /**
   * @constuct class constructor
   *
   * @param NgbModal modalService
   * @param toastr ToastrService
   */
  constructor(private modalService: NgbModal,
	private toastr: ToastrService) {}

  /**
   * On component load
   *
   * @params none
   * @returns void
   */
  ngOnInit(): void { }

  /**
   * @description method to load image corresponding to button click
   * @param { index } number
   * @returns void
   * @author null
   */
  loadImage(index: number): void {
	const actualIndex = this.divCollection.findIndex((ele, eleIndex) => {
		if (ele.showImage === false && index >= eleIndex) {
			return true;
		}
		return false;
	});
	console.log('actual', actualIndex);
	if (actualIndex != undefined && actualIndex != null && actualIndex > -1) {
		if (this.imgCollection.length === this.divCollection.length) {
			this.showIndexImg(actualIndex, this.imgCollection[actualIndex]);
		} else if (typeof this.imgCollection[actualIndex] != 'undefined') {
			this.showIndexImg(actualIndex, this.imgCollection[actualIndex]);
		} else {
			this.toastr.error('Image not found for this box');
		}
	}
  }

   /**
   * @description method to show Indexd Imgage
   * @param { index, url } number, string
   * @returns void
   * @author null
   */
  showIndexImg(index: number, url: string) {
	this.divCollection[index].showImage = true;
	this.divCollection[index].url = url;
  }

  /**
   * @description method to delete image corresponding to button click
   * @param none
   * @returns void
   * @author null
   */
  deletImage(): void {
	const imgUrl = this.imgCollection.find((img, imgIndex) => imgIndex === this.currentIndex);
	if (imgUrl && imgUrl != null && imgUrl != undefined) {
		this.imgCollection.splice(this.currentIndex, 1);
	} else {
		this.toastr.error('Image is not available for this div');
	}
	this.closeModal();
  }

  /**
   * @description To open the deleteImageModal
   * @param content: TemplateRef <NgbModal>
   * @param { index } number
   * @returns none
   * @author null
   */
  openConfirm(content: TemplateRef<NgbModal>, index: number): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'dark-modal',
    };
	this.modelRef = this.modalService.open(content, ngbModalOptions);
	this.divCollection = this.divCollection.filter(ele => {
		ele.showImage = false;
		return true;
	});
	this.currentIndex = index;
  }

  /**
   * @description To close the open modal
   * @param content: TemplateRef <NgbModal>
   * @returns none
   * @author null
   */
  closeModal(): void {
    this.modelRef.close();
  }
}
