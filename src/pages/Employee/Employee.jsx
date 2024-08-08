import { changeStatus, getEmpList } from "@/apis/Employee";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import "./Employee.scss";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
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
      render: (_, { username, status, id }) => (
        <div className="action-button">
          {username === "admin" ? (
            <div className="admin-button">
              <Button disabled>update</Button>
              <Button disabled>ban</Button>
            </div>
          ) : (
            <div className="admin-button">
              <Button onClick={()=>HandleAddEmp("update",id)}>update</Button>
              {status !== 0 ? (
                <Popconfirm
                  title="Warning"
                  description="Are you sure to change this account's status to banned?"
                  onConfirm={()=>confirm(status, id)}
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
                  description="Are you sure to change this account's status to active?"
                  onConfirm={()=>confirm(status, id)}
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
            </div>
          )}
        </div>
      ),
    },
  ];
  
  const confirm = (status,id) => {
    handleStatus(status, id)
    message.success('success');
  };
  const cancel = () => {

  };
  const [empList, setEmpList] = useState([
    {
      records: [],
      total: "",
    },
  ]);
  //
  const [params, setParams] = useState({
    name: "",
    page: 1,
    pageSize: 10,
  });
  //search
  const onSearch = (value) => {
    setParams({
      ...params,
      name: value,
    });
  };
  //page
  const pageChange = (page, pageSize) => {
    setParams({
      ...params,
      page: page,
      pageSize: pageSize,
    });
  };

  useEffect(() => {
    async function fetchEmpList() {
      const res = await getEmpList(params);
      setEmpList(res.data.data);
    }
    fetchEmpList();
  }, [params]);

  //handle status
  
  const handleStatus = async (status, id) => {
    console.log(status);
    const newStatus = status === 0 ? 1 : 0;
    await changeStatus(newStatus, id);
    setParams({
      ...params,
    });
  };

  //navi addemp
  const navigate = useNavigate();
  const HandleAddEmp = (str,id) => {
    if(str === "add"){
      navigate("/employee/add");
    }else if(str==='update'){
      navigate(`/employee/add?id=${id}`);
    }
   
  };

  return (
    <div className="emp-container">
      <div className="table-bar flex">
        <div className="table-bar-left">
          <label>employee name:</label>
          <Search
            placeholder="please enter employee name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />{" "}
        </div>

        <div className="add-emp-btn" onClick={()=>HandleAddEmp("add")}>
          <Button type="primary">Add Employee</Button>
        </div>
      </div>

      <div className="emp-table">
        <Table
          columns={columns}
          dataSource={empList.records}
          rowKey="id"
          pagination={{
            current: params.page,
            pageSize: params.pageSize,
            onChange: pageChange,
            total: empList.total,
          }}
        />
      </div>
    </div>
  );
};

export default Employee;
