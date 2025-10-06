import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiUpload, 
  FiEdit, 
  FiBarChart3,
} from 'react-icons/fi'
import clsx from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Upload CV', href: '/upload', icon: FiUpload },
  { name: 'Review Profile', href: '/review', icon: FiEdit },
  { name: 'Radar Chart', href: '/radar', icon: FiBarChart3 },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex flex-col flex-grow">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'mr-3 flex-shrink-0 h-5 w-5',
                      isActive
                        ? 'text-primary-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar