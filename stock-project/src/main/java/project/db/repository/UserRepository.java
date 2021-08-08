package project.db.repository;

import org.springframework.stereotype.Repository;

import project.db.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);
    Optional<User> findByNickname(String nickname);
}