import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Table,
  Tag,
  Popconfirm,
  Checkbox,
  message,
} from "antd";
import "./Dish.scss";
import { deleteDishBatch, getDishList, updateDish } from "@/apis/Dish";
import useCategoryList from "./hooks/useCategoryList";
import { useNavigate } from "react-router-dom";

const Dish = () => {
  //setCategory
  const categoryList = useCategoryList();

  //colums
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, { categoryId }) => (
        <>
          {categoryList.map((item) => {
            return item.value === categoryId ? item.label : null;
          })}
        </>
      ),
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (text) => `$${text}`, // Adding a dollar sign prefix
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="" style={{ maxWidth: 80, maxHeight: 60 }} />
      ),
    },
    {
      title: "updateTime",
      dataIndex: "updateTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status === 0 ? (
            <div className="ban">
              <Tag color="red">banned</Tag>
            </div>
          ) : (
            <div className="active">
              <Tag color="green">active</Tag>
            </div>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { status, id, name, sort, type }) => (
        <div className="action-button">
          <div className="admin-button">
            <Button onClick={() => addDishType(id)}>update</Button>
            {status !== 0 ? (
              <Popconfirm
                title="Warning"
                description="Are you sure to change this account's status to banned?"
                onConfirm={() => confirm(status, id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{
                    backgroundColor: "rgb(255, 241, 240)",
                    borderColor: "rgb(255, 163, 158)",
                    color: "rgb(207, 19, 34)",
                  }}
                >
                  ban
                </Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Warning"
                description="Are you sure to change this account's status to actice?"
                onConfirm={() => confirm(status, id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{
                    backgroundColor: "rgb(246, 255, 237)",
                    borderColor: "rgb(183, 235, 143)",
                    color: "rgb(56, 158, 13)",
                  }}
                >
                  active
                </Button>
              </Popconfirm>
            )}

            <Popconfirm
              title="Warning"
              description="Are you sure to delete"
              onConfirm={() => confirmDel(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>delete</Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];
  //saleStatus
  const saleStatus = [
    {
      value: 0,
      label: "cease selling",
    },
    {
      value: 1,
      label: "start selling",
    },
  ];

  //get dishCategory
  const dishCategorys = useCategoryList();
  //prepare params
  const [dishInput, setDishInput] = useState("");
  const handleInput = (e) => {
    setDishInput(e.target.value);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  //update params
  const search = () => {
    setParams({
      ...params,
      categoryId: selectedCategory,
      name: dishInput,
      status: selectedStatus,
    });
  };
  const pageChange = (page, pageSize) => {
    setParams({
      ...params,
      page: page,
      pageSize: pageSize,
    });
  };

  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [dishList, setDishList] = useState({
    total: "",
    records: [],
  });
  useEffect(() => {
    async function getDish() {
      const res = await getDishList(params);
      setDishList(res.data.data);
    }
    getDish();
  }, [params]);
  //handle delete
  const [rowSeleced, setRowSelected] = useState("");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelected(selectedRowKeys);
    },
  };
  const confirmDel = async (id) => {
    const res = await deleteDishBatch(id);
    if (res.data.code !== 1) {
      message.error(res.data.msg);
    } else {
      message.success("delete successed");
      setParams({ ...params });
    }
  };
  const batchDel = async () => {
    const res = await deleteDishBatch(rowSeleced.join(","));
    if (res.data.code !== 1) {
      message.error(res.data.msg);
    } else {
      message.success("delete successed");
      setParams({ ...params });
    }
  };

  //add dish / update dish
  const navigate = useNavigate();
  const addDishType = (value) => {
    if (value === "add") {
      navigate("/dish/add");
    } else {
      navigate(`/dish/add?id=${value}`);
    }
    //change status
  };
  const confirm =async (status, id) => {
    let newStatus = status===0? 1:0
    const data ={
      id,
      status:newStatus
    }
    const res = await updateDish(data)
    if (res.data.code !== 1) {
      message.error(res.data.msg);
    } else {
      message.success("change successed");
      setParams({ ...params });
    }
  };
  return (
    <div className="Dish">
      <div className="dish-container">
        <div className="dish-header flex flex-sb  ">
          <div className="dish-header-left flex">
            <div className="dish-input">
              <label>Dish name</label>
              <Input
                placeholder="Please enter dish name"
                onChange={handleInput}
                style={{
                  width: 150,
                }}
              />
            </div>
            <div className="dish-select">
              <label>sales status</label>
              <Select
                defaultValue="Please Select"
                allowClear
                options={saleStatus}
                onChange={handleStatusChange}
              />

              <label>Dish category</label>
              <Select
                defaultValue="Please Select"
                allowClear
                options={dishCategorys}
                onChange={handleCategoryChange}
              />
            </div>
            <Button onClick={search}>Search</Button>
          </div>
          <div className="category-header-right">
            <Button type="primary" onClick={batchDel}>
              - Batch Delete
            </Button>
            <Button type="primary" onClick={() => addDishType("add")}>
              + Add Dish
            </Button>
          </div>
        </div>
        <div className="dish-table">
          <div className="category-table">
            <Table
              columns={columns}
              dataSource={dishList.records}
              rowKey="id"
              rowSelection={{
                type: Checkbox,
                ...rowSelection,
              }}
              pagination={{
                current: params.page,
                pageSize: params.pageSize,
                onChange: pageChange,
                total: dishList.total,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
