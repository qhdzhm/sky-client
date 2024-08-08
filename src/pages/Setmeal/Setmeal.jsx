import { delBatchMeal, getMealList, updateMeal } from "@/apis/Setmeal";
import { Button, Checkbox, Input, message, Popconfirm, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import useMealCategory from "./hooks/useMealCategory";
import './Setmeal.scss'
import { useNavigate } from "react-router-dom";
const Setmeal = () => {
  
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
          { mealCategory.map((item) => {
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
      render: (_, { status, id }) => (
        <div className="action-button">
          <div className="admin-button">
            <Button onClick={()=>handleDish(id)}>update</Button>
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
                description="Are you sure to change this account's status to active?"
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
  const [mealList, setMealList] = useState({ total: "", records: [] });

  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    async function getmeal() {
      const res = await getMealList(params);
      setMealList(res.data.data);
    }
    getmeal();
  }, [params]);

  const [selectedKeys,setSelectedKeys] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedKeys(selectedRowKeys)
    },
  };
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
  const [mealInput, setmealInput] = useState("");
  const handleInput = (e) => {
    setmealInput(e.target.value);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  const mealCategory = useMealCategory()
  //update params
  const search = () => {
    setParams({
      ...params,
      categoryId: selectedCategory,
      name: mealInput,
      status: selectedStatus,
    });
  };
  const navigate = useNavigate()

  const handleDish =(value)=>{
    if(value==='add'){
      navigate('/setmeal/add')
    }else{
      navigate(`/setmeal/add?id=${value}`)
    }
  }
  console.log(selectedKeys.join(','));
  //handle delete
  const batchDel = async ()=>{
    const res = delBatchMeal(selectedKeys.join(','))
    if (res.data.code !== 1) {
      message.error(res.data.msg);
    } else {
      message.success("delete successed");
      setParams({ ...params });
    }
  }
  const confirmDel =async (id) =>{
    const res =await delBatchMeal(id)
    if (res.data.code !== 1) {
      message.error(res.data.msg);
    } else {
      message.success("delete successed");
      setParams({ ...params });
    }
  }

  //handel status change
  const confirm = async (status,id)=>{
    const newStatus = status===0? 1: 0
    const res = await updateMeal({status:newStatus,id:id})
    if (res.data.code !== 1) {
      message.error(res.data.msg);
    } else {
      message.success("update successed");
      setParams({ ...params });
    }
  }
  
  return (
    <div className="setmeal">
      <div className="setmeal-container">
        <div className="setmeal-header flex flex-sb">
          <div className="setmeal-header-left flex">
            <div className="setmeal-search-input">
              <label>Meal name</label>
              <Input
                placeholder="Please enter meal name"
                onChange={handleInput}
                style={{
                  width: 150,
                }}
              />
            </div>
            <div className="setmeal-select">
              <label>sales status</label>
              <Select
                defaultValue="Please Select"
                allowClear
                options={saleStatus}
                onChange={handleStatusChange}
              />

              <label>Meal category</label>
              <Select
                defaultValue="Please Select"
                allowClear
                options={mealCategory}
                onChange={handleCategoryChange}
              />
            </div>
            <Button onClick={search}>Search</Button>
          </div>
          <div className="category-header-right">
            <Button type="primary" onClick={batchDel}>- Batch Delete</Button>
            <Button type="primary" onClick={()=>handleDish('add')}>+ Add Meal</Button>
          </div>
        </div>

        <div className="dish-table">
          <div className="category-table">
            <Table
              columns={columns}
              dataSource={mealList.records}
              rowKey="id"
              rowSelection={{
                type: Checkbox,
                ...rowSelection,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setmeal;
