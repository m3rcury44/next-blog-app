import styles from './styles.module.scss';
import Image from 'next/image';
import { Session } from 'next-auth';

const UserInfo = ({session}: {session: Session | null}) => {
  return (
    <>
      {session?.user &&
        <div className={styles.userInfo}>
          {session?.user?.image &&
            <Image src={session.user.image} alt={session.user.name as string} width={40} height={40}/>
          }
          <h3>{session.user.name}</h3>
        </div>
      }
    </>
  );
};

export default UserInfo;
