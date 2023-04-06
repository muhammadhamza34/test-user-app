import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupee, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../actions";
import Magnifier from "react-magnifier";
import "./style.css";

/**
 * @author
 * @function ProductDetailsPage
 **/

export const ProductDetailsPage = (props) => {
  const [thumbindex, setThumbindex] = useState(0);
  const history = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  let params = useParams();

  useEffect(() => {
    const { productId } = params;
    console.log(props.productId);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div
                className="thumbnail"
                onClick={() => setThumbindex(index)}
                style={{ cursor: "pointer" }}
              >
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
            ))}
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              {/* <img
                src={generatePublicUrl(
                  product.productDetails.productPictures[thumbindex].img
                )}
                alt={`${product.productDetails.productPictures[thumbindex].img}`}
              /> */}

              <Magnifier 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              className="magnifyerImage" 
              src={generatePublicUrl(product.productDetails.productPictures[thumbindex].img)} 
              alt={`${product.productDetails.productPictures[thumbindex].img}`}
              
              />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  history("/cart");
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="/">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <FontAwesomeIcon icon={faRupee} />
              &nbsp;
              <FontAwesomeIcon icon={faArrowRight} />
              &nbsp; 4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <FontAwesomeIcon icon={faRupee} />
                &nbsp;
                <FontAwesomeIcon icon={faArrowRight} />
                &nbsp;
                {product.productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                if you are buy above 20 items you get 20 % off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
