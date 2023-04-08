import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { MaterialButton } from "../../../components/MaterialUI";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import "./style.css";
/**
 * @author
 * @function ProductStore
 **/

export const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    console.log(props);
    dispatch(getProductBySlug(params.slug));
  }, [dispatch, params.slug, props]);

  console.log(product.priceRange);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${params.slug} ITEMS under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#071F45"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => {
                if (product.productStatus == "active") {
                  return (
                    <Link
                      to={`/${product.slug}/${product._id}/p`}
                      className="productContainer"
                      style={{
                        display: "block",
                        textDecoration: "none",
                        color: "#000",
                      }}
                    >
                      <div className="productImgContainer">
                        <img
                          src={generatePublicUrl(
                            product.productPictures[0].img
                          )}
                          alt=""
                        />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: "5px 0" }}>{product.name}</div>
                        <div>
                          <Rating value="4.3" />
                          &nbsp;&nbsp;
                          <span
                            style={{
                              color: "#777",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            (3353)
                          </span>
                        </div>
                        <Price value={product.price} />
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </Card>
        );
      })}
    </>
  );
};
