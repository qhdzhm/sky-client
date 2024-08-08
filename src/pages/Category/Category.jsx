import { Button, Input, Select, Modal, Form } from "antd";
import React, { useEffect, useState } from "react";
import { Table, Tag, Popconfirm, message } from "antd";
import "./Category.scss";
import {
  addCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
  updateStatus,
} from "@/apis/Category";
const Category = () => {
  //colum
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, { type }) => (
        <>
          {type === 1 ? <span>Dish Category</span> : <span>Meal Category</span>}
        </>
      ),
    },

    {
      title: "Sort",
      dataIndex: "sort",
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
            <Button onClick={() => HandleUpdate(name, sort, id, type)}>
              update
            </Button>
            {status !== 0 ? (
              <Popconfirm
                title="Warning"
                description="Are you sure to change this account's status to active?"
                onConfirm={() => confirm(status, id)}
                onCancel={cancel}
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
                description="Are you sure to change this account's status to banned?"
                onConfirm={() => confirm(status, id)}
                onCancel={cancel}
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
              onCancel={cancel}
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

  const confirmDel =async (id) => {
    const res = await deleteCategory(id)
    
    if (res.data.code === 1) {
      message.success("success");
    } else {
      message.error(res.data.msg);
    }
    setParams({
      ...params
    })
  };
  const [options] = useState([
    {
      value: 1,
      label: "Dish Category",
    },
    {
      value: 2,
      label: "Setmeal Category",
    },
  ]);
  //get category list
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryType, setCategoryType] = useState(1);
  const handleInput = (e) => {
    setCategoryInput(e.target.value);
  };

  //select change
  const handleChange = (value) => {
    setCategoryType(value);
  };
  const [params, setParams] = useState({
    name: "",
    type: "",
    page: 1,
    pageSize: 10,
  });

  const [categoryList, setCategoryList] = useState([
    {
      records: [],
      total: "",
    },
  ]);

  //SearchCategory
  const SearchCategory = () => {
    setParams({
      ...params,
      name: categoryInput,
      type: categoryType,
    });
  };
  //page handel
  const pageChange = (page, pageSize) => {
    setParams({
      ...params,
      page: page,
      pageSize: pageSize,
    });
  };
  useEffect(() => {
    async function fetchCategoryList() {
      const res = await getCategoryList(params);
      setCategoryList(res.data.data);
    }
    fetchCategoryList();
  }, [params]);

  //popconfirm/cancel
  const confirm = async (status, id) => {
    const newStatus = status === 0 ? 1 : 0;
    console.log(id, newStatus);
    const res = await updateStatus(id, newStatus);
    if (res.data.code === 1) {
      message.success("success");
    } else {
      message.error(res.data.msg);
    }
    setParams({
      ...params,
    });
  };
  const cancel = () => {};

  //addCategory

  const [addDishParams, setAddDishParams] = useState({});

  const HandleUpdate = (name, sort, id, type) => {
    setIsModalOpen(true);
    form.setFieldsValue({ name: name, sort: sort });
    setAddDishParams({
      name: name,
      sort: sort,
      id: id,
    });
  };

  const onFinish = async (values) => {
    console.log(values);

    const data = {
      ...addDishParams,
      ...values,
    };
    console.log(data);

    try {
      if (!data.id) {
        console.log("insert");
        const res = await addCategory(data);
        if (res.data.code === 1) {
          message.success("success");
        } else {
          message.error(res.data.msg);
        }
      } else {
        console.log("update");
        const res = await updateCategory(data);
        if (res.data.code === 1) {
          message.success("success");
        } else {
          message.error(res.data.msg);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to perform operation.");
    }
    setParams({
      ...params,
    });
  };
  const addDishType = () => {
    form.resetFields();
    setIsModalOpen(true);
    setAddDishParams({
      type: 1,
    });
  };
  const addMealType = () => {
    form.resetFields();
    setIsModalOpen(true);
    setAddDishParams({
      type: 2,
    });
  };

  //model control
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //handle form
  const [form] = Form.useForm();

  return (
    <div className="category">
      <div className="category-container">
        <div className="category-header flex flex-sb">
          <div className="category-header-left flex">
            <div className="categoty-input">
              <label>category name</label>
              <Input
                placeholder="Basic usage"
                onChange={handleInput}
                style={{
                  width: 200,
                }}
              />
            </div>
            <div className="categoty-select">
              <label>category type</label>
              <Select
                defaultValue="Select category"
                allowClear
                options={options}
                onChange={handleChange}
              />
            </div>
            <Button onClick={SearchCategory}>Search</Button>
          </div>
          <div className="category-header-right">
            <Button onClick={addDishType} type="primary">
              + Add Dish Category
            </Button>
            <Button onClick={addMealType} type="primary">
              + Add Meal Category
            </Button>
          </div>
        </div>
        <div className="category-table">
          <Table
            columns={columns}
            dataSource={categoryList.records}
            rowKey="id"
            pagination={{
              current: params.page,
              pageSize: params.pageSize,
              onChange: pageChange,
              total: categoryList.total,
            }}
          />
        </div>
      </div>

      <div className="Model">
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              form="form"
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            form={form}
            id="form"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="name"
              label="Category name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="sort"
              label="sort"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
