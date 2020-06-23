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
    { name: "One", value: 1, showImage: false },
    { name: "Two", value: 2, showImage: false },
    { name: "Three", value: 3, showImage: false },
    { name: "Four", value: 4, showImage: false },
    { name: "Five", value: 5, showImage: false },
    { name: "Six", value: 6, showImage: false },
  ];

  /**
   * local reference for imgCollection
   */
  imgCollection: { url: string, index: number }[] = [
	  { url: "assets/images/no-data.png", index: 0 },
	  { url: "assets/images/no-data.png", index: 3 },
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
   * local reference for imgUrl
   */
  imgUrl: string;

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
  ngOnInit(): void {
    // console.log("data", this.divArray);
  }

  /**
   * @description method to load image corresponding to button click
   * @param { index } number
   * @returns void
   * @author null
   */
  loadImage(index: number): void {
	const imgObj = this.imgCollection.find(img => img.index === index);
	if (imgObj && imgObj != null && imgObj != undefined) {
		this.showIndexImg(index, imgObj.url);
	} else {
		const lesserIndexImg = this.imgCollection.reverse().find(img => img.index < index);
		if (lesserIndexImg && lesserIndexImg != null && lesserIndexImg != undefined) {
			this.showIndexImg(lesserIndexImg.index, lesserIndexImg.url);
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
	this.divCollection = this.divCollection.filter((ele, eleIndex) => {
		if (eleIndex != index) {
			ele.showImage = false;
		} else if (eleIndex === index) {
			ele.showImage = true;
		}
		return ele;
	});
	this.imgUrl = url;
  }

  /**
   * @description method to delete image corresponding to button click
   * @param none
   * @returns void
   * @author null
   */
  deletImage(): void {
	const imgObj = this.imgCollection.find(img => img.index === this.currentIndex);
	this.divCollection = this.divCollection.filter(ele => {
		ele.showImage = false;
		return ele;
	});

	if (imgObj && imgObj != null && imgObj != undefined) {
		this.imgCollection = this.imgCollection.filter(obj => obj.index != this.currentIndex);
		this.toastr.success('Image has been deleted successfully');
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
