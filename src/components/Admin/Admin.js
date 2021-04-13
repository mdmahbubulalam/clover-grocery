import { useHistory } from 'react-router';

const Admin = () => {

    const history = useHistory();
    const handleAddProduct = () => {
        history.push(`/addProduct`);
    }
    const handleManageProduct = () => {
        history.push(`/manageProduct`);
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mr-3" onClick={handleAddProduct}>Add Product</button>
                <button className="btn btn-info" onClick={handleManageProduct}>Manage Product</button>
            </div>
        </div>
    );
};

export default Admin;