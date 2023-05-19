package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.models.Account;
import com.example.flowersadminpanel.repositories.AccountRepository;
import com.example.flowersadminpanel.security.AccountDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class AccountDetailsService implements UserDetailsService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isEmpty()){
            throw new UsernameNotFoundException("User with this name does not exist!");
        }
        return new AccountDetails(account.get());
    }
}
