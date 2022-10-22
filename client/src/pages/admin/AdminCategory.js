import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/card/Jumbotron";
import AdminNav from "../../components/nav/AdminNav";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const AdminCategory = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const getCategries = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getCategries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/category`, { name });

      if (data?.error) {
        toast.error(data.error);
      } else {
        getCategries();
        toast.success("Category created.");
        setName("");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updateName,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is Updated.`);
        setSelected(null);
        setUpdateName("");
        getCategries();
        setVisible(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is Deleted.`);
        setSelected(null);
        getCategries();
        setVisible(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Categories"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminNav />
          </div>
          <div className="col-md-9">
            <div className="h2">Admin Categories</div>
            <div className="p-2">
              <CategoryForm
                value={name}
                text="Add Category"
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="col">
              {categories?.map((c) => (
                <button
                  key={c.id}
                  className="btn btn-outline-primary m-2"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdateName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <Modal
              title="Update Category"
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <div>
                <CategoryForm
                  text={"Update"}
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleUpdate}
                  handleDelete={handleDelete}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
