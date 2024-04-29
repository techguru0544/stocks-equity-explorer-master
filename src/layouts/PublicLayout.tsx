import { Outlet } from 'react-router-dom';

// Layer to navigate to only public routes
const PublicLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
