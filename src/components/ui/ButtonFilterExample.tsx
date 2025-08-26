import ButtonFilter from './ButtonFilter';

const ButtonFilterExample = () => {
  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.7167 2.28333C11.9333 2.5 12.05 2.78333 12.05 3.06667C12.05 3.35 11.9333 3.63333 11.7167 3.85L10.15 5.41667L8.58333 3.85L10.15 2.28333C10.3667 2.06667 10.65 1.95 10.9333 1.95C11.2167 1.95 11.5 2.06667 11.7167 2.28333ZM2.5 11.5V13.0667H4.06667L10.7167 6.41667L9.15 4.85L2.5 11.5Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="p-5 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Buttons Filter</h1>

        {/* Column Headers */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">Without icon</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">Badge</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">Icon left</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">Icon Left/Badge</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">Icon Right</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-600">Icon Right/Badge</span>
          </div>
        </div>

        {/* Row Headers */}
        <div className="flex gap-4 mb-6">
          <div className="w-20 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">Default</span>
          </div>
          <div className="w-20 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">Hover</span>
          </div>
          <div className="w-20 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">Active</span>
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-6 gap-4">
          {/* Default Row */}
          <div className="space-y-4">
            <ButtonFilter variant="no-icon" state="default">
              Active
            </ButtonFilter>
            <ButtonFilter variant="no-icon" state="hover">
              Active
            </ButtonFilter>
            <ButtonFilter variant="no-icon" state="active">
              Active
            </ButtonFilter>
          </div>

          {/* Badge Row */}
          <div className="space-y-4">
            <ButtonFilter variant="badge" state="default" badge="1">
              Active
            </ButtonFilter>
            <ButtonFilter variant="badge" state="hover" badge="1">
              Active
            </ButtonFilter>
            <ButtonFilter variant="badge" state="active" badge="1">
              Active
            </ButtonFilter>
          </div>

          {/* Icon Left Row */}
          <div className="space-y-4">
            <ButtonFilter variant="icon-left" state="default" leftIcon={<EditIcon />}>
              Active
            </ButtonFilter>
            <ButtonFilter variant="icon-left" state="hover" leftIcon={<EditIcon />}>
              Active
            </ButtonFilter>
            <ButtonFilter variant="icon-left" state="active" leftIcon={<EditIcon />}>
              Active
            </ButtonFilter>
          </div>

          {/* Icon Left + Badge Row */}
          <div className="space-y-4">
            <ButtonFilter
              variant="badge-icon-left"
              state="default"
              leftIcon={<EditIcon />}
              badge="1"
            >
              Active
            </ButtonFilter>
            <ButtonFilter variant="badge-icon-left" state="hover" leftIcon={<EditIcon />} badge="1">
              Active
            </ButtonFilter>
            <ButtonFilter
              variant="badge-icon-left"
              state="active"
              leftIcon={<EditIcon />}
              badge="1"
            >
              Active
            </ButtonFilter>
          </div>

          {/* Icon Right Row */}
          <div className="space-y-4">
            <ButtonFilter variant="icon-right" state="default" rightIcon={<EditIcon />}>
              Active
            </ButtonFilter>
            <ButtonFilter variant="icon-right" state="hover" rightIcon={<EditIcon />}>
              Active
            </ButtonFilter>
            <ButtonFilter variant="icon-right" state="active" rightIcon={<EditIcon />}>
              Active
            </ButtonFilter>
          </div>

          {/* Icon Right + Badge Row */}
          <div className="space-y-4">
            <ButtonFilter
              variant="badge-icon-right"
              state="default"
              rightIcon={<EditIcon />}
              badge="1"
            >
              Active
            </ButtonFilter>
            <ButtonFilter
              variant="badge-icon-right"
              state="hover"
              rightIcon={<EditIcon />}
              badge="1"
            >
              Active
            </ButtonFilter>
            <ButtonFilter
              variant="badge-icon-right"
              state="active"
              rightIcon={<EditIcon />}
              badge="1"
            >
              Active
            </ButtonFilter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonFilterExample;
