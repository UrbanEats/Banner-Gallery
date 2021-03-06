/* eslint-disable no-console */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

import BrandonTextRegular from '../fonts/BrandonText-Regular.otf';
import BrandonTextMedium from '../fonts/BrandonText-Medium.otf';
import BrandonTextBold from '../fonts/BrandonText-Bold.otf';

import GalleryImage from './GalleryImage';
import ImageModal from './ImageModal';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Brandon-Text-Regular;
    src: url('${BrandonTextRegular}') format('opentype');
  }
  @font-face {
    font-family: Brandon-Text-Medium;
    src: url('${BrandonTextMedium}') format('opentype');
  }
  @font-face {
    font-family: Brandon-Text-Bold;
    src: url('${BrandonTextBold}') format('opentype');
  }
`;

const Gallery = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: #2d333f;
`;

class BannerGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      modal: null,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeLeftModal = this.changeLeftModal.bind(this);
    this.changeRightModal = this.changeRightModal.bind(this);
  }

  componentDidMount() {
    const url = window.location.pathname;
    let listing = url.slice(1, -1);

    if (Number(listing.slice(1)) <= 0 || Number(listing.slice(1)) >= 100) {
      listing = 'L1';
    }

    axios.get(`/api/${listing}`)
      .then((res) => {
        this.setState({
          images: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openModal(image) {
    this.setState({ modal: image });
  }

  closeModal() {
    this.setState({ modal: null });
  }

  changeLeftModal() {
    const { images } = this.state;
    const { modal } = this.state;

    for (let i = 0; i < images.length; i += 1) {
      if (images[i].id === modal.id) {
        if (images[i - 1] !== undefined) {
          this.setState({ modal: images[i - 1] });
        }
      }
    }
  }

  changeRightModal() {
    const { images } = this.state;
    const { modal } = this.state;

    for (let i = 0; i < images.length; i += 1) {
      if (images[i].id === modal.id) {
        if (images[i + 1] !== undefined) {
          this.setState({ modal: images[i + 1] });
        }
      }
    }
  }

  render() {
    const { images, modal } = this.state;
    return (
      <Gallery>
        <GlobalStyle />
        {modal && (
          <ImageModal
            image={modal}
            closeModal={this.closeModal}
            changeRightModal={this.changeRightModal}
            changeLeftModal={this.changeLeftModal}
          />
        )}
        <div>{images.slice(0, 2).map((image) => <GalleryImage key={image.id} imageSize="small" image={image} openModal={this.openModal} />)}</div>
        {images.slice(2, 3).map((image) => <GalleryImage key={image.id} imageSize="large" image={image} openModal={this.openModal} />)}
        <div>{images.slice(3, 5).map((image) => <GalleryImage key={image.id} imageSize="small" image={image} openModal={this.openModal} />)}</div>
        {images.slice(5, 6).map((image) => <GalleryImage key={image.id} imageSize="large" image={image} openModal={this.openModal} />)}
        <div>{images.slice(6, 8).map((image) => <GalleryImage key={image.id} imageSize="small" image={image} openModal={this.openModal} />)}</div>
        {images.slice(8, 9).map((image) => <GalleryImage key={image.id} imageSize="large" image={image} openModal={this.openModal} />)}
        {images.slice(9, 10).map((image) => <GalleryImage key={image.id} imageSize="large" image={image} openModal={this.openModal} />)}
      </Gallery>
    );
  }
}

export default BannerGallery;
