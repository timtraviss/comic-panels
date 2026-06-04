import AdminSidebar from '@/app/admin/_components/AdminSidebar'
import styles from './layout.module.css'

export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <main className={styles.content}>{children}</main>
    </div>
  )
}
